"use client";

import { useSearchParams } from 'next/navigation';

const PermissionsPage= () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  console.lo

  return <div>hiiii, this is permissions page for ID: {id}</div>;
};

export default PermissionsPage
