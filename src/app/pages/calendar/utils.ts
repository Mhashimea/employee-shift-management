export interface CalendarEvent<MetaType = any> {
  id?: string | number;
  start: Date;
  end?: Date;
  title: string;
  color?: EventColor;
  actions?: EventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  meta?: MetaType;
  employeeDetails?: any
  type?: string
}

export interface EventColor {
  primary: string;
  secondary: string;
}

export interface EventAction {
  id?: string | number;
  label: string;
  cssClass?: string;
  a11yLabel?: string;
  onClick({ event, sourceEvent, }: {
    event: CalendarEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }): any;
}