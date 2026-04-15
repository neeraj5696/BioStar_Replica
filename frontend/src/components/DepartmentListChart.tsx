import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Department {
  department: string;
  employeeCount: number;
}

interface DepartmentListChartProps {
  department: Department[];
  totaldepartment: number | null;
}

const StyledText = styled('text')(({ theme }) => ({
  fill: '#374151',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 18,
  fontWeight: 600,
}));

const StyledSubText = styled('text')(({ theme }) => ({
  fill: '#6b7280',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 12,
}));

function PieCenterLabel({ children, subText }: { children: React.ReactNode; subText?: string }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <StyledText x={left + width / 2} y={top + height / 2 - (subText ? 8 : 0)}>
        {children}
      </StyledText>
      {subText && (
        <StyledSubText x={left + width / 2} y={top + height / 2 + 15}>
          {subText}
        </StyledSubText>
      )}
    </>
  );
}

export default function DepartmentListChart({ department, totaldepartment }: DepartmentListChartProps) {
  const [view, setView] = React.useState('overview');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  // Define colors for departments
  const departmentColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
  ];

  // Add null checks and default values
  const departmentData = department || [];
  const totalEmployees = departmentData.reduce((sum, dept) => sum + dept.employeeCount, 0);
  
  // Show loading state if no data
  if (!department || department.length === 0) {
    return (
      <Box sx={{ width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Loading department data...
        </Typography>
      </Box>
    );
  }

  // Calculate responsive sizes
  const chartHeight = isMobile ? 280 : isTablet ? 320 : 350;
  const innerRadius = isMobile ? 35 : isTablet ? 45 : 50;
  const middleRadius = isMobile ? 75 : isTablet ? 85 : 100;

  // Create main department data
  const mainDepartmentData = departmentData.slice(0, 8).map((dept, index) => ({
    id: dept.department,
    label: dept.department,
    value: dept.employeeCount,
    percentage: (dept.employeeCount / totalEmployees) * 100,
    color: departmentColors[index % departmentColors.length],
  }));

  // Create detailed breakdown for top departments
  const detailedData = departmentData.slice(0, 5).flatMap((dept, index) => {
    const baseColor = departmentColors[index % departmentColors.length];
    const deptTotal = dept.employeeCount;
    
    // Create sub-segments (you can modify this based on your actual data structure)
    return [
      {
        id: `${dept.department}-main`,
        label: `${dept.department}`,
        value: Math.floor(deptTotal * 0.7), // 70% main
        percentage: 70,
        color: baseColor,
      },
      {
        id: `${dept.department}-sub`,
        label: `${dept.department} (Sub)`,
        value: Math.ceil(deptTotal * 0.3), // 30% sub
        percentage: 30,
        color: `${baseColor}80`, // Add transparency
      },
    ];
  });

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <ToggleButtonGroup
        color="primary"
        size="small"
        value={view}
        exclusive
        onChange={handleViewChange}
        sx={{ 
          mb: 2,
          '& .MuiToggleButton-root': {
            fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Responsive font size
            padding: { xs: '4px 8px', sm: '6px 12px' } // Responsive padding
          }
        }}
      >
        <ToggleButton value="overview">Overview</ToggleButton>
        <ToggleButton value="detailed">Detailed</ToggleButton>
      </ToggleButtonGroup>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        height: chartHeight
      }}>
        {view === 'overview' ? (
          <PieChart
            series={[
              {
                innerRadius,
                outerRadius: middleRadius,
                data: mainDepartmentData,
                arcLabel: (item) => `${Math.round(item.percentage)}%`,
                valueFormatter: ({ value }) => `${value} employees`,
                highlightScope: { fade: 'global', highlight: 'item' },
                highlighted: { additionalRadius: 3 },
                cornerRadius: 2,
              },
            ]}
            sx={{
              '& .MuiChartsLegend-root': {
                display: 'none',
              },
            }}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel subText="Departments">{totaldepartment}</PieCenterLabel>
          </PieChart>
        ) : (
          <PieChart
            series={[
              {
                innerRadius,
                outerRadius: middleRadius - 20,
                data: mainDepartmentData.slice(0, 5),
                arcLabel: (item) => `${item.label}`,
                valueFormatter: ({ value }) => `${value} employees`,
                highlightScope: { fade: 'global', highlight: 'item' },
                highlighted: { additionalRadius: 2 },
                cornerRadius: 2,
              },
              {
                innerRadius: middleRadius - 20,
                outerRadius: middleRadius,
                data: detailedData,
                arcLabel: (item) => `${Math.round((item.value / totalEmployees) * 100)}%`,
                valueFormatter: ({ value }) => `${value} employees`,
                arcLabelRadius: middleRadius + 10,
                highlightScope: { fade: 'global', highlight: 'item' },
                highlighted: { additionalRadius: 2 },
                cornerRadius: 2,
              },
            ]}
            sx={{
              '& .MuiChartsLegend-root': {
                display: 'none',
              },
            }}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel subText="Detailed">{totalEmployees}</PieCenterLabel>
          </PieChart>
        )}
      </Box>
    </Box>
  );
}