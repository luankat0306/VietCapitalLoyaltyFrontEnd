import { Box, styled } from "@material-ui/core";
import React, { FC, useEffect, useRef, useState } from "react";
import CategoryMenuCard from "./CategoryMenuCard";

// component props interface
export interface CategoryMenuProps {
  open?: boolean;
  children: React.ReactElement;
}
// styled component
const Wrapper = styled(Box)<{ open: boolean }>(({ open }) => ({
  position: "relative",
  cursor: "pointer",
  "& .dropdown-icon": {
    marginLeft: "0.25rem",
    transition: "all 250ms ease-in-out",
    transform: `rotate(${open ? "90deg" : "0deg"})`,
  },
}));

const CategoryMenu: FC<CategoryMenuProps> = ({
  open: isOpen = false,
  children,
}) => {
  const [open, setOpen] = useState(isOpen);
  const popoverRef = useRef(open);
  popoverRef.current = open;

  const toggleMenu = (e: React.MouseEvent<Document, MouseEvent>) => {
    e.stopPropagation();
    if (!isOpen) setOpen((open) => !open);
  };

  const handleDocumentClick = () => {
    if (popoverRef.current && !isOpen) setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper open={open}>
      {React.cloneElement(children, {
        open,
        className: `${children.props.className}`,
        onClick: toggleMenu,
      })}
      <CategoryMenuCard open={open} />
    </Wrapper>
  );
};

export default CategoryMenu;
