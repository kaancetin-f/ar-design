export type CalendarEvent = {
  start: Date;
  end: Date;
};

interface IProps {
  data: CalendarEvent[];
  config?: {
    locale?: Intl.LocalesArgument;
    weekStartsOn?: number;
  };
}

export default IProps;
