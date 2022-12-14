import styled from "@emotion/styled";

export const EditorWrapperModule = styled.div`
  /* Editor */

  .SymphonyEditor {
    /* Overrides the border radius setting in the theme. */
    --ck-border-radius: 0.375rem;
  }

  .SymphonyEditor ul {
    list-style-type: disc;
  }

  .SymphonyEditor ol {
    list-style-type: decimal;
  }

  ol {
    list-style-type: decimal !important;
    list-style-position: inside !important;
  }

  .SymphonyEditor ul,
  .SymphonyEditor ol {
    list-style-position: inside;
    padding-left: 16px;
  }

  .SymphonyEditor ul ul,
  .SymphonyEditor ol ul {
    list-style-type: circle;
    list-style-position: inside;
  }

  .SymphonyEditor ol ol,
  .SymphonyEditor ul ol {
    list-style-type: lower-latin;
    list-style-position: inside;
  }

  .SymphonyEditor .ck.ck-dropdown .ck-dropdown__arrow {
    z-index: auto !important;
  }

  .SymphonyEditor .ck-editor__editable {
    min-height: 150px;
  }

  .SymphonyEditor .ck-content {
    background-color: white !important;
  }
`;
