'use client';
import React, { useEffect, useState } from "react";
import { Button, Flex, Skeleton } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import ModuleCard from "../components/ModuleCard";
import { moduleSchema } from "@/app/validationSchema";
import { z } from "zod";

type Module = {
  id: number;
  title: string;
  description: string;
};

const ModulesPage = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await axios.get("/api/modules");
        console.log(res.data);
        setModules(res.data);
      } catch (error) {
        setError('Failed to fetch posts');
        console.error(error)
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, []);

  return (
    <div className="space-y-4">
      <Button>
        <Link href="/modules/new">New Module</Link>
      </Button>
      <Flex wrap='wrap' gap='4'>
      {loading ? (
          // Display Skeletons while loading
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-[300px]">
              <Skeleton width="100%" height="200px" />
              <Skeleton width="80%" height="21px" className="mt-2" />
              <Skeleton width="60%" height="15px" className="mt-2" />
            </div>
          ))
        ) : error ? (
          <p>{error}</p>
        ) : modules.length > 0 ? (
            modules.map((module) => (
              <ModuleCard 
              key={module.id}
              title={module.title}
              description={module.description}/>
            ))
          ) : (
            <p>No modules yet.</p>
          )}
        </Flex>
    </div>
  );
};

export default ModulesPage;
