import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type UserStats = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  type: string;
};

interface UserStatusChartProps {
  userStats: UserStats | null;
}

const StyledText = styled('text')(() => ({
  fill: '#374151',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
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

export default function UserStatusChart({ userStats }: UserStatusChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const total = userStats?.totalUsers || 0;
  const active = userStats?.activeUsers || 0;
  const inactive = userStats?.inactiveUsers || 0;

  // Calculate responsive sizes
  const chartHeight = isMobile ? 250 : isTablet ? 280 : 300;
  const innerRadius = isMobile ? 45 : isTablet ? 55 : 60;
  const outerRadius = isMobile ? 80 : isTablet ? 90 : 100;

  const data = [
    {
      id: 'active',
      label: 'Active',
      value: active,
      color: '#10b981',
    },
    {
      id: 'inactive',
      label: 'Inactive',
      value: inactive,
      color: '#ef4444',
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
        slotProps={{
            
        }}
      >
        <PieCenterLabel subText="Total">{total}</PieCenterLabel>
      </PieChart>
    </Box>
  );
}