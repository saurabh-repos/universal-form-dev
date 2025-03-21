"use client";

import ViewForm from "@/components/ViewForm/ViewForm";
import { userRequest } from "@/lib/requestMethod";
import { setActivePath } from "@/redux/store/slices/menuSlice";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const activePath = localStorage.getItem("activePath");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActivePath({ viewPage: true, activePath: activePath }));
  }, [activePath]);

  return form ? <ViewForm form={form} /> : <p>Loading...</p>;
};

export default Page;
