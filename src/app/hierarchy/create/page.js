"use client";

import { useSearchParams } from "next/navigation";

const CreateHierarchyPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <div>hiiii, this is create hierarchy page for ID: {id}</div>;
};

export default CreateHierarchyPage;
