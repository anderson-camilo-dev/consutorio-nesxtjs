"use client";

import Link from "next/link";
export default function Sobre() {
  return (
    <main className="min-h-screen bg-white p-6 flex flex-col items-center space-y-10">
        <Link href="/">
        <div className="bg-cyan-800 flex h-8 w-15 pt-1  hover:cyan-500 rounded-lg">
          <h1 className="text-white/80 text-center mx-auto">Voltar</h1> 
        </div></Link>
      {/* Header */}
      <header className="text-center ">
        
        <h1 className="text-4xl font-bold text-cyan-700">Consultório Saúde</h1>
        <p className="mt-2 text-gray-600 text-lg">
          Cuidando da sua saúde com carinho e profissionalismo.
        </p>
      </header>

      {/* Imagem */}
      <div className="w-full max-w-3xl">
        <img
          src="./logo.png"
          alt="Consultório"
          className="w-full h-64 object-cover rounded-lg "
        />
      </div>

      {/* Sobre */}
      <section className="max-w-3xl text-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold text-cyan-700">Sobre nós</h2>
        <p>
          O Consultório Saúde é um espaço dedicado ao cuidado integral da saúde, 
          oferecendo serviços médicos de qualidade, atendimento humanizado e uma equipe 
          especializada pronta para cuidar de você e da sua família.
        </p>
        <p>
          Nosso compromisso é proporcionar conforto, confiança e resultados que promovam 
          o bem-estar físico e mental dos nossos pacientes. Com tecnologia moderna e uma 
          abordagem personalizada, garantimos um atendimento eficiente e acolhedor.
        </p>
      </section>

      {/* Serviços */}
      <section className="max-w-3xl text-gray-700 space-y-4">
        <h2 className="text-2xl font-semibold text-cyan-700">Nossos Serviços</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Consultas médicas gerais e especializadas</li>
          <li>Exames laboratoriais e diagnósticos</li>
          <li>Orientação nutricional e acompanhamento de saúde</li>
          <li>Atendimento humanizado e personalizado</li>
        </ul>
      </section>

      {/* Contato */}
      <section className="max-w-3xl text-gray-700 space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-cyan-700">Contato</h2>
        <p>Endereço: Rua Imaginária, 123, Cidade Exemplo</p>
        <p>Telefone: (11) 1234-5678</p>
        <p>Email: contato@vidasaudavel.com</p>
      </section>
    </main>
  );
}
