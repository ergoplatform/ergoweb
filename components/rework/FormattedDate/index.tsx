import React from 'react';
import { useRouter } from 'next/router';
import { format, parseISO } from 'date-fns';

interface Props {
  date: string;
}

function FormattedDate(props: Props) {
  // TODO: add locale support
  const formattedDate = format(parseISO(props.date), 'dd.MM.yyyy');

  return <span>{formattedDate}</span>;
}

export default FormattedDate;
