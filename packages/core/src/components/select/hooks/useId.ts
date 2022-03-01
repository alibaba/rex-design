import * as React from 'react';

let uuid = 0;

export function getUUID(): number | string {
  return uuid++;
}

export default function useId(id?: string) {
  const [innerId, setInnerId] = React.useState<string>();
  React.useEffect(() => {
    setInnerId(`rex-select-${getUUID()}`);
  }, []);
  return id || innerId;
}
