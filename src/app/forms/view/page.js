"use client";

import ViewForm from "@/components/ViewForm/ViewForm";
import { userRequest } from "@/lib/requestMethod";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // const activeFormId = useSelector((state) => state.forms.activeFormId);
  // const form = useSelector((state) => state.forms.tempForms[activeFormId]);
  const [form, setForm] = useState(null);
  const getFormById = async () => {
    const res = await userRequest.get(`/admin/getFormById?id=${id}`);
    setForm(res.data.data);
  };
  useEffect(() => {
    getFormById();
  }, [id]);

  return form ? <ViewForm form={form} /> : <p>Loading...</p>;
};

export default Page;
