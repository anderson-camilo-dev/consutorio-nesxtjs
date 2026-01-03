"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AtendenteForm from "./components/atendent/AtendenteForm";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const atendente = localStorage.getItem("atendente");
    if (atendente) {
      router.replace("/calendario");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center text-black justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl  shadow-lg w-full max-w-md">
        <AtendenteForm
          onSave={(atendente) => {
            localStorage.setItem("atendente", JSON.stringify(atendente));
            router.push("/calendario");
          }}
          onCancel={() => {}}
        />
      </div>
    </div>
  );
}
