import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

const SelectBucket = (props: {
  enabled: boolean,
  buckets: string[],
  selectedBucket: string | null
  onSelectBucket: (type: string) => void,
}) => {
  const [collapsed, openDropdown] = useState(false);
  const handleToggle = () => {
    openDropdown(!collapsed);
  };
  const items = props.buckets.map(bucket => <DropdownItem onClick={(e) => {
    props.onSelectBucket(bucket);
  }} key={bucket}>{bucket}</DropdownItem>);

  return (
    <Dropdown isOpen={collapsed} toggle={handleToggle}>
      <DropdownToggle disabled={!props.enabled} caret>
        {props.selectedBucket || 'select bucket'}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>available buckets:</DropdownItem>
        {items}
      </DropdownMenu>
    </Dropdown>
  );
};

export { SelectBucket };