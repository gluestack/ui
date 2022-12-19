import { Link } from 'solito/link';
import React from 'react';
import { Button } from '@gluestack/ui';

export function DocsButton2() {
  return (
    <Link href="/">
      <Button disabled sx={{ style: { bg: '$blue200' } }}>
        <Button.Text sx={{ style: { color: '$red700' } }}>
          Button 2!
        </Button.Text>
      </Button>
    </Link>
  );
}
