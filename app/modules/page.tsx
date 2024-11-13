"use client";
import React, { useEffect, useState } from "react";
import { Button, Flex, Skeleton, TextField } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import ModuleCard from "../components/ModuleCard";
import { FaMagnifyingGlass } from "react-icons/fa6";

type Module = {
  id: number;
  title: string;
  description: string;
};

const ModulesPage = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchModules() {
      const res = await axios.get("/api/modules");
      try {
        console.log(res.data);
        setModules(res.data);
        setFilteredModules(res.data); // Initialize filteredModules with all modules
      } catch (error) {
        setError("Failed to fetch posts");
        console.log(res.data);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, []);

  // Filter modules based on the search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredModules(
        modules.filter((module) =>
          module.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredModules(modules); // If search term is empty, show all modules
    }
  }, [searchTerm, modules]);

  return (
    <div className="space-y-4">
      <Flex gap="2" direction="row" justify="end">
        <TextField.Root
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search the modules..."
        >
          <TextField.Slot>
            <FaMagnifyingGlass height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button>
          <Link href="/modules/new">New Module</Link>
        </Button>
      </Flex>
      <Flex wrap="wrap" gap="4">
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
        ) : filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
            />
          ))
        ) : (
          <p>No modules found.</p>
        )}
      </Flex>
    </div>
  );
};

export default ModulesPage;
