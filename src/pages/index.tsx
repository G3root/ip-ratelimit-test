import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{
    isRateLimited: boolean;
    ip: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("/api/ip");
      const res = await req.json();

      setData(res);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        <li>is rate limited : {data?.isRateLimited}</li>
        <li>ip address : {data?.ip}</li>
      </ul>
    </div>
  );
}
