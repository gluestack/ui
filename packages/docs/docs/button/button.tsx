import { Link } from 'solito/link';
import React from 'react';
import { Button, ButtonText } from '@gluestack/ui';

export function DocsButton2() {
  return (
    <Link href="/">
      <Button disabled sx={{ style: { bg: '$blue200' } }}>
        <ButtonText sx={{ style: { color: '$red700' } }}>Button 2!</ButtonText>
      </Button>
    </Link>
  );
}
