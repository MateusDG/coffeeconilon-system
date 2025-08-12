import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Tooltip, IconButton, Link } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link as RouterLink } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface Props {
  icon: React.ReactElement;
  label: string;
  value: number | string;
  delta?: number; // positive, negative, or 0
  prefix?: string;
  suffix?: string;
  help?: string;
  helpLinkTo?: string;
  helpLinkText?: string;
}

const KpiCard: React.FC<Props> = ({ icon, label, value, delta, prefix, suffix, help, helpLinkTo, helpLinkText }) => {
  const isPositive = (delta ?? 0) > 0;
  const isNegative = (delta ?? 0) < 0;
  const deltaColor = isPositive ? 'success' : isNegative ? 'error' : 'default';

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" alignItems="center" gap={1}>
            {icon}
            <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
            {help && (
              <Tooltip
                title={
                  <Box>
                    <Typography variant="caption" display="block">{help}</Typography>
                    {helpLinkTo && (
                      <Link component={RouterLink} to={helpLinkTo} color="inherit" underline="always" sx={{ mt: 0.5, display: 'inline-block' }}>
                        {helpLinkText || 'Saiba mais'}
                      </Link>
                    )}
                  </Box>
                }
                arrow
              >
                <IconButton size="small" color="default" aria-label={`ajuda sobre ${label}`}>
                  <InfoOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          {delta !== undefined && (
            <Chip
              size="small"
              color={deltaColor as any}
              icon={isPositive ? <TrendingUpIcon /> : isNegative ? <TrendingDownIcon /> : undefined}
              label={`${delta > 0 ? '+' : ''}${delta.toFixed(0)}%`}
              variant={delta === 0 ? 'outlined' : 'filled'}
            />
          )}
        </Box>
        <Typography variant="h4">
          {prefix}{value}{suffix}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
