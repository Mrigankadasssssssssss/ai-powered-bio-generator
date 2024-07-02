"use client";

import React, { useContext } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Meta from "../icons/Meta";
import Mistral from "../icons/Mistral";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"
import { generateBio } from "@/app/actions";
import { BioContext } from "@/context/BioContext";


const formSchema = z.object({
  model: z.string().min(1, {
    message: "Model is required.",
  }),
  temperature: z.number().min(0).max(2, {
    message: "It must be atmost 2 .",
  }),
  content: z
    .string()
    .min(50, { message: "Content should be at least 50 characters." })
    .max(500, { message: "Content will not exceed 500 characters." }),
  type: z.enum(["Personal", "Brand"], {
    errorMap: () => ({ message: "Type is required." }),
  }),
  tone: z.enum(
    [
      "Professional",
      "Casual",
      "Sarcastic",
      "Funny",
      "Passionate",
      "Thoughtful",
    ],
    {
      errorMap: () => ({ message: "Tone is required." }),
    }
  ),
  addEmoji: z.boolean(),
});

const UserInput = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "Llama3-8B-8192",
      temperature: 1,
      content: "",
      type: "Personal",
      tone: "Professional",
      addEmoji: false,
    },
  });
  const {setOutput,setLoading,loading} = useContext(BioContext)
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    setLoading(true)
    const userInputValues = `
      User Input : ${values.content},
      Bio Type : ${values.type},
      Bio Tone : ${values.tone},
      Add Emojis : ${values.addEmoji},
    `
    try {
      const {data} = await generateBio(userInputValues,values.temperature,values.model)
      // console.log(data)
      setOutput(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <div className="relative flex flex-col items-start">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-7"
        >
          <fieldset className="grid gap-6 rounded-[8px] items-start border bg-background/10 backdrop-blur-sm w-full p-4 ">
            <legend className="-ml-1 px-1 font-medium text-sm">Settings</legend>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Model." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="llama3-8b-8192">
                            <div className="flex items-start text-muted-foreground gap-3">
                              <Meta className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground mr-3 font-medium">
                                    LLaMA3
                                  </span>
                                  8b
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="llama3-70b-8192">
                            <div className="flex items-start text-muted-foreground gap-3">
                              <Meta className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground mr-3 font-medium">
                                    LLaMA3
                                  </span>
                                  70b
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="mixtral-8x7b-32768">
                            <div className="flex items-start text-muted-foreground gap-3">
                              <Mistral className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground mr-3 font-medium">
                                    Mixtral
                                  </span>
                                  8x7b
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2 ">
                      {" "}
                      <span className="flex items-center justify-center">
                        Creativity
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-2 cursor-pointer text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={25}
                            collisionPadding={20}
                            className="max-w-sm"
                          >
                            <p>
                              A higher setting produces more creative and
                              surprising bios, while a lower setting sticks to
                              more predictable and conventional styles.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </span>{" "}
                      <span>{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[1]}
                        min={0}
                        max={2}
                        step={0.1}
                        className="cursor-pointer"
                        onValueChange={(val) => onChange(val[0])}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-[8px] items-start border bg-background/10 backdrop-blur-sm w-full p-4 ">
            <legend className="-ml-1 px-1 font-medium text-sm">
              User Input
            </legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2 ">
                      About Yourself
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add your old social media bio or write few sentences about yourself."
                        className="min-h-[7.5rem]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2 ">
                      Type
                    </FormLabel>
                   
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Personal">
                            Personal
                          </SelectItem>
                          
                          <SelectItem value="Brand">
                            Brand
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2 ">
                      Tone
                    </FormLabel>
                   
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Tone." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Professional">
                          Professional
                          </SelectItem>
                          
                          <SelectItem value="Casual">
                          Casual
                          </SelectItem>
                          <SelectItem value="Sarcastic">
                          Sarcastic
                          </SelectItem>
                          <SelectItem value="Funny">
                          Funny
                          </SelectItem>
                          <SelectItem value="Passionate">
                          Passionate
                          </SelectItem>
                          <SelectItem value="Thoughtful">
                          Thoughtful
                          </SelectItem>
                          
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="addEmoji"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="text-sm mr-4">
                      Add Emojis
                    </FormLabel>
                    <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="!my-0"
                    />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <Button className="rounded" type="submit" disabled={loading}> {loading && <Loader2 className="w-4 h-4 animate-spin"/>} Generate </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
