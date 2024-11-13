"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  TextField,
  Spinner,
  Grid
} from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import ModuleCard from "../components/ModuleCard";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Module } from '@/app/types/module';

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
        setFilteredModules(res.data);
      } catch (error) {
        setError("Failed to fetch modules");
        console.log(res.data);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredModules(
        modules.filter((module) =>
          module.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredModules(modules);
    }
  }, [searchTerm, modules]);

  return (
    <div className="space-y-4">
      <Flex gap="4" direction="row" justify="end">
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
      {loading ? (
        <div className="w-full h-full flex justify-center items-center space-x-2">
          <Spinner size="2" />
          <span className="font-medium">Fetching modules...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
          {error ? (
            <p>{error}</p>
          ) : filteredModules.length > 0 ? (
            filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
              />
            ))
          ) : (
            <p>No modules found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
