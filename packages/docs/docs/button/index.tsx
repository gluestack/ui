import { Link } from 'solito/link';
import React from 'react';
import { Button } from '@gluestack/ui';

export function DocsButton() {
  return (
    <Link href="/button2">
      <Button disabled sx={{ style: { bg: '$primary500' } }}>
        <Button.Text sx={{ style: { color: '$red500' } }}>
          Button 1!
        </Button.Text>
      </Button>
    </Link>
  );
}
