import { useState } from 'react';

export default function AvailabilityCalendar({ bookedDates = [], onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => 
      new Date(bookedDate).toDateString() === date.toDateString()
    );
  };

  const isDateInPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date) => {
    if (!selectedRange.start) return false;
    if (!selectedRange.end) {
      return date.toDateString() === selectedRange.start.toDateString();
    }
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const handleDateClick = (date) => {
    if (isDateInPast(date) || isDateBooked(date)) return;

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      // Start new selection
      setSelectedRange({ start: date, end: null });
    } else {
      // Complete selection
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: date });
      }
      
      if (onDateSelect) {
        onDateSelect({
          start: date < selectedRange.start ? date : selectedRange.start,
          end: date < selectedRange.start ? selectedRange.start : date
        });
      }
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square" />
      );
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isBooked = isDateBooked(date);
      const isPast = isDateInPast(date);
      const isSelected = isDateSelected(date);
      const isStartOrEnd = selectedRange.start?.toDateString() === date.toDateString() || 
                          selectedRange.end?.toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(date)}
          disabled={isBooked || isPast}
          className={`
            aspect-square p-2 rounded-lg text-sm font-medium transition-all
            ${isPast ? 'text-text-muted-light/30 dark:text-text-muted-dark/30 cursor-not-allowed' : ''}
            ${isBooked ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 cursor-not-allowed line-through' : ''}
            ${isSelected && !isBooked && !isPast ? 'bg-primary text-white' : ''}
            ${!isSelected && !isBooked && !isPast ? 'hover:bg-secondary-light dark:hover:bg-secondary-dark text-text-light dark:text-text-dark' : ''}
            ${isStartOrEnd ? 'ring-2 ring-primary ring-offset-2' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const clearSelection = () => {
    setSelectedRange({ start: null, end: null });
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="p-2 rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        
        <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-text-muted-light dark:text-text-muted-dark p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span className="text-text-muted-light dark:text-text-muted-dark">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 dark:bg-red-900/20 rounded"></div>
          <span className="text-text-muted-light dark:text-text-muted-dark">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary-light dark:bg-secondary-dark rounded"></div>
          <span className="text-text-muted-light dark:text-text-muted-dark">Available</span>
        </div>
      </div>

      {/* Selected range display */}
      {selectedRange.start && (
        <div className="mt-4 p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-1">
                Selected Range
              </p>
              <p className="font-semibold text-text-light dark:text-text-dark">
                {selectedRange.start.toLocaleDateString()}
                {selectedRange.end && ` - ${selectedRange.end.toLocaleDateString()}`}
              </p>
              {selectedRange.end && (
                <p className="text-sm text-primary mt-1">
                  {Math.ceil((selectedRange.end - selectedRange.start) / (1000 * 60 * 60 * 24)) + 1} days
                </p>
              )}
            </div>
            <button
              onClick={clearSelection}
              className="px-3 py-1.5 text-sm bg-white dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
