import { useState, useCallback, useMemo } from 'react';

export function useBooking() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calculate total days
  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  // Validate dates
  const validateDates = useCallback(() => {
    if (!startDate || !endDate) {
      return 'Please select both start and end dates';
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return 'Start date cannot be in the past';
    }

    if (end <= start) {
      return 'End date must be after start date';
    }

    return null;
  }, [startDate, endDate]);

  // Submit booking
  const submitBooking = useCallback(async (item, navigate) => {
    const validationError = validateDates();
    if (validationError) {
      setError(validationError);
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      navigate('/booking-request', {
        state: { 
          item, 
          startDate, 
          endDate, 
          totalDays 
        }
      });
      return true;
    } catch (err) {
      setError(err.message || 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, totalDays, validateDates]);

  // Reset booking
  const reset = useCallback(() => {
    setStartDate('');
    setEndDate('');
    setError(null);
    setLoading(false);
  }, []);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    totalDays,
    loading,
    error,
    submitBooking,
    reset,
    isValid: totalDays > 0 && !validateDates()
  };
}
