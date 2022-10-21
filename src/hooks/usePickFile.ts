import { useState } from "react";

import { TPropsPickFile } from "@/components";
import { StrictOmit } from "@/utils/types";

export const usePickFile = (): StrictOmit<TPropsPickFile, "linkFile"> => {
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [isSubmitFile, setIsSubmitFile] = useState<boolean>(false);
  return { selectedFile, isSubmitFile, setIsSubmitFile, setSelectedFile };
};
