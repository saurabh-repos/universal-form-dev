"use client";

import { useSearchParams } from "next/navigation";

const CreateFormPage = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  return <div>hiiii, this is create form page for ID: {id}</div>;
};

export default CreateFormPage;
