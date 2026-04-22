import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type UserStats1 = {
  totalUsers: number;
  presentUsers: number;
  absentUsers: number;
  insideUsers: number;
  outsideUsers: number;
  type: string;
};

interface DepartmentUsersChartProps {
  userStats1: UserStats1 | null;
}

const StyledText = styled('text')(() => ({
  fill: '#374151',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 18,
  fontWeight: 600,
}));

const StyledSubText = styled('text')(() => ({
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

export default function DepartmentUsersChart({ userStats1 }: DepartmentUsersChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const total = userStats1?.totalUsers || 0;
  const present = userStats1?.presentUsers || 0;
  const absent = userStats1?.absentUsers || 0;
  const inside = userStats1?.insideUsers || 0;
  const outside = userStats1?.outsideUsers || 0;

  const occupancyPercentage = total ? Math.round((inside / total) * 100) : 0;

  // Calculate responsive sizes
  const chartHeight = isMobile ? 250 : isTablet ? 280 : 300;
  const innerRadius = isMobile ? 45 : isTablet ? 55 : 60;
  const outerRadius = isMobile ? 80 : isTablet ? 90 : 100;

  const data = [
    {
      id: 'present',
      label: 'Present',
      value: present,
      color: '#10b981',
    },
    {
      id: 'absent',
      label: 'Absent',
      value: absent,
      color: '#ef4444',
    },
    {
      id: 'inside',
      label: 'Inside',
      value: inside,
      color: '#3b82f6',
    },
    {
      id: 'outside',
      label: 'Outside',
      value: outside,
      color: '#f59e0b',
    },
  ];

  return (
    <Box sx={{ 
      width: '100%', 
      height: chartHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <PieChart
        series={[
          {
            innerRadius,
            outerRadius,
            data: data,
            arcLabel: (item) => `${Math.round((item.value / total) * 100)}%`,
            valueFormatter: ({ value }) => `${value} users`,
            highlightScope: { fade: 'global', highlight: 'item' },
            highlighted: { additionalRadius: 3 },
          },
        ]}
        sx={{
          '& .MuiChartsLegend-root': {
            display: 'none',
          },
        }}
        slotProps={{}}
      >
        <PieCenterLabel subText="occupancy">{occupancyPercentage}%</PieCenterLabel>
      </PieChart>
    </Box>
  );
}