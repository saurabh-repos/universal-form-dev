"use client";

import FormHeader from "@/components/Form/FormHeader";
import FormTools from "@/components/Form/FormTools";
import { useSearchParams } from "next/navigation";

const CreateFormPage = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <FormHeader />
        <FormTools/>
      </div>
    </div>
  );
};

export default CreateFormPage;
