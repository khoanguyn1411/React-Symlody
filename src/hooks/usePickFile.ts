import { useState } from "react";

import { TPropsPickFile } from "@/components";

export const usePickFile = (): TPropsPickFile => {
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [isSubmitFile, setIsSubmitFile] = useState<boolean>(false);
  return { selectedFile, isSubmitFile, setIsSubmitFile, setSelectedFile };
};
