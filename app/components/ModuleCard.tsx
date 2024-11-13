import React from "react";
import { Box, Container } from "@radix-ui/themes";
import Link from "next/link";
import { Module } from '@/app/types/module';

type ModuleCardProps = {
  module: Module;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  return (
    <div className="w-[320px] rounded overflow-hidden shadow-lg">
      <img className="w-full h-64" src="https://picsum.photos/200/300" alt={module.title || "Module image"} />
      <div className="px-6 py-4">
        <Link href={`/modules/${module.id}`}>
          <div className="font-bold text-lg uppercase">{module.title}</div>
        </Link>
        <p className="text-zinc-400 text-sm line-clamp-2">{module.description}</p>
      </div>
    </div>
  );
};

export default ModuleCard;
