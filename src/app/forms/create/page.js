"use client";

import { useEffect, useState } from "react";
import FieldCreator from "@/components/Form/FieldCreator";
import FormHeader from "@/components/Form/FormHeader";
import FormTools from "@/components/Form/FormTools";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms, updateForm } from "@/redux/asyncActions/formActions";
import { setForms } from "@/redux/store/slices/sidebarSlice";
import { newTag } from "@/constants/newForm";

const CreateFormPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const id = searchParams.get("id");
  // const form = useSelector((state) => state.form.forms[id]);
  const [selectedFieldId, setSelectedFieldId] = useState(-1);
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    dispatch(fetchForms())
      .unwrap()
      .then((data) => {
        dispatch(setForms(data));
      });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchForms())
        .unwrap()
        .then((data) => {
          dispatch(setForms(data));
          const foundForm = data.find((f) => f._id === id);
          if (foundForm) {
            setFormState(foundForm);
          }
        });
    }
  }, [id]);

  const addField = () => {
    if (!formState) return;
    const updatedForm = {
      ...formState,
      sections: formState.sections.map((section, index) => {
        if (index === 0) {
          return {
            ...section,
            tags: [...section.tags, newTag],
          };
        }
        return section;
      }),
    };

    setFormState(updatedForm);
    dispatch(updateForm({ id, updates: updatedForm }));
  };

  if (!formState) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex gap-4 mt-4 cursor-pointer"
        onClick={() => setSelectedFieldId(-1)}
      >
        <FormHeader
          fieldIndex={-1}
          selectedFieldId={selectedFieldId}
          setSelectedFieldId={setSelectedFieldId}
        />
        {selectedFieldId === -1 && <FormTools addField={addField} />}
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {formState.sections[0]?.tags.map((tag, index) => (
          <div key={index} className="flex gap-4">
            <FieldCreator
              fieldIndex={index}
              formId={id}
              selectedFieldId={selectedFieldId}
              setSelectedFieldId={setSelectedFieldId}
              tag={tag}
            />
            {selectedFieldId === index && <FormTools addField={addField} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateFormPage;
