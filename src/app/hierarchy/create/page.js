"use client";

import CreateHierarchyTree from "@/components/Hierarchy/Create/CreateHierarchyTree";
import TreeCreator from "@/components/Hierarchy/Create/TreeCreator";
import ViewHierarchy from "@/components/Hierarchy/View/ViewHierarchy";
import { setHierarchyCreatedTrue } from "@/redux/store/slices/hierarchySlice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const CreateHierarchyPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const isCreated = useSelector((state) => state.hierarchy.isCreated);
  const [hieararchyCreated, setHierarchyCreated] = useState(isCreated);

  const hanldeAddHierarchy = () => {
    dispatch(setHierarchyCreatedTrue());
  };

  useEffect(() => {
    setHierarchyCreated(isCreated);
  }, [isCreated]);

  return (
    <>
      {!hieararchyCreated && (
        <div className="w-[80%] flex mx-auto mt-10 gap-6">
          <div className="w-1/2 h-32 border border-dashed border-black p-1 rounded-2xl">
            <button
              className="bg-[#D9D9D9] text-[#999999] w-full h-full rounded-2xl cursor-pointer"
              onClick={hanldeAddHierarchy}
            >
              Add Hierarchy Flow
            </button>
          </div>
          <div className="w-1/2 h-32 border border-dashed border-black p-1 rounded-2xl">
            <button className="bg-[#D9D9D9] text-[#999999] w-full h-full rounded-2xl cursor-pointer">
              Add Approver Flow
            </button>
          </div>
        </div>
      )}
      <div className="flex w-full">
        <div className="w-1/2">
          <CreateHierarchyTree />
          {/* <TreeCreator /> */}
        </div>
        <div className="w-1/2">
          <ViewHierarchy />
        </div>
      </div>
    </>
  );
};

export default CreateHierarchyPage;
