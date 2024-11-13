"use client";

import { TextField, Callout, Button, Spinner, Flex } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import { moduleSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Module } from "@/app/types/module";

type ModuleForm = z.infer<typeof moduleSchema>;

const ViewModulePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);

  const [module, setModule] = useState<Module | undefined>(undefined);
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset, // Access the reset function from react-hook-form
  } = useForm<ModuleForm>({
    resolver: zodResolver(moduleSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.put(`/api/modules?id=${id}`, data);
      router.push("/modules");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await axios.get(`/api/modules?id=${id}`);
        console.log(res.data);
        setModule(res.data);
      } catch (error) {
        setError("Failed to fetch module");
        console.error(error);
      }
    }

    fetchModules();
  }, [id]);

  useEffect(() => {
    if (module) {
      reset({
        title: module.title || "",
        description: module.description || "",
      });
    }
  }, [module, reset]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/modules?id=${id}`);
      router.push("/modules"); // Redirect to the modules list after deletion
    } catch (error) {
      setError("Failed to delete module");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <CiCircleInfo />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-4" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Write description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Flex gap="4">
          <Button disabled={isSubmitting}>
            Create New Issue{isSubmitting && <Spinner />}
          </Button>
          <Button
            color="red"
            onClick={handleDelete}
            disabled={isSubmitting}
            className="mt-4"
          >
            Delete Module
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default ViewModulePage;
