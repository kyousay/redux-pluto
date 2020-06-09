import React from "react";
import styled from "styled-components";

export type Props = {
  id: string;
  name: string;
  checked: boolean;
  content: string;
  index: number;
  onChangeHandler: Function;
};

export default function TodoItem(props: Props) {
  const { id, name, checked, content, index, onChangeHandler } = props;
  return (
    <TodoRow>
      <TodoCheck
        id={id}
        type="checkbox"
        checked={checked}
        name={name}
        onChange={() => onChangeHandler(index, checked)}
      />
      <TodoContent htmlFor={id}>{content}</TodoContent>
    </TodoRow>
  );
}

const TodoCheck = styled.input`
  width: 25px;
  height: 25px;
`;

const TodoContent = styled.label`
  font-size: 1.2rem;
`;

const TodoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
