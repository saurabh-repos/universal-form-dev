"use client";

import { useEffect, useState } from "react";
import FieldCreator from "@/components/Form/FieldCreator";
import FormHeader from "@/components/Form/FormHeader";
import FormTools from "@/components/Form/FormTools";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchForms } from "@/app/store/slices/formSlice";
import { setForms } from "@/app/store/slices/sidebarSlice";


const CreateFormPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch()
  const id = searchParams.get("id");
  const [selectedFieldId, setSelectedFieldId] = useState(-1);
  const [fields, setFields] = useState([]);
  const [fieldCounter, setFieldCounter] = useState(0);
 
  useEffect(()=>{
    dispatch(fetchForms())
    .unwrap()
    .then((data) => {
      dispatch(setForms(data));
    })
  },[])

  const addField = () => {
    setFieldCounter((prev) => prev + 1);
    setFields([...fields, fieldCounter]);
    // createNewForm()
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex gap-4 mt-4 cursor-pointer"
        onClick={() => setSelectedFieldId(-1)}
      >
        <FormHeader
          fieldId={-1}
          selectedFieldId={selectedFieldId}
          setSelectedFieldId={setSelectedFieldId}
        />
        {selectedFieldId === -1 && <FormTools addField={addField} />}
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {fields.map((fieldId) => (
          <div key={fieldId} className="flex gap-4">
            <FieldCreator
              fieldId={fieldId}
              selectedFieldId={selectedFieldId}
              setSelectedFieldId={setSelectedFieldId}
            />
            {selectedFieldId === fieldId && <FormTools addField={addField} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateFormPage;
