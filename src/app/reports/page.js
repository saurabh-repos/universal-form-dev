"use client";

import { useSearchParams } from 'next/navigation';

const ReportsPage= () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  console.lo

  return <div>hiiii, this is reports page for ID: {id}</div>;
};

export default ReportsPage
