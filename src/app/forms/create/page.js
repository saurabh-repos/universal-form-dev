"use client";

import { useEffect, useState, useMemo } from "react";
import FieldCreator from "@/components/Form/FieldCreator";
import FormHeader from "@/components/Form/FormHeader";
import FormTools from "@/components/Form/FormTools";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms, updateForm } from "@/redux/asyncActions/formActions";
import { setForms } from "@/redux/store/slices/sidebarSlice";
import { newTag } from "@/constants/newForm";
import { addTag } from "@/redux/store/slices/formSlice";

const CreateFormPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const id = searchParams.get("id");

  const formState = useSelector((state) => state.forms.tempForms[id]);
  const [selectedFieldId, setSelectedFieldId] = useState(-1);

  const tempForm = useMemo(() => formState, [formState]);

  useEffect(() => {
    dispatch(fetchForms())
      .unwrap()
      .then((data) => {
        dispatch(setForms(data));
      });
  }, [dispatch]);

  const addField = (sectionIndex) => {
    if (!tempForm) return;
    dispatch(addTag({ formId: id, sectionIndex, tag: newTag }));
  };

  if (!tempForm) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex gap-4 mt-4 cursor-pointer"
        onClick={() => setSelectedFieldId(-1)}
      >
        <FormHeader
          tagIndex={-1}
          selectedFieldId={selectedFieldId}
          setSelectedFieldId={setSelectedFieldId}
        />
        {selectedFieldId === -1 && <FormTools addField={() => addField(0)} />}
      </div>

      {tempForm.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex flex-col gap-6 mt-4">
          {section.tags.map((tag, index) => (
            <div key={index} className="flex gap-4">
              <FieldCreator
                tagIndex={index}
                sectionIndex={sectionIndex}
                formId={id}
                selectedFieldId={selectedFieldId}
                setSelectedFieldId={setSelectedFieldId}
                tag={tag}
              />
              {selectedFieldId === index && (
                <FormTools addField={() => addField(sectionIndex)} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CreateFormPage;
