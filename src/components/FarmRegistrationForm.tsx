import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CalendarIcon,
  ChevronRight,
  TractorIcon as Farm,
  Loader2,
  MapPin,
  User,
} from "lucide-react";
import { format } from "date-fns";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/useToast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { registerFarmRequest } from "@/slices/farmSlices";
import { motion } from "framer-motion";

const formSchema = z.object({
  farmName: z.string().min(2, {
    message: "Farm name must be at least 2 characters.",
  }),
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  latitude: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num >= -90 && num <= 90;
    },
    { message: "Latitude must be a number between -90 and 90." }
  ),
  longitude: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num >= -180 && num <= 180;
    },
    { message: "Longitude must be a number between -180 and 180." }
  ),
  flockType: z.string({
    required_error: "Please select a flock type.",
  }),
  birdCount: z.string().refine(
    (val) => {
      const num = Number.parseInt(val);
      return !isNaN(num) && num > 0;
    },
    { message: "Bird count must be a positive number." }
  ),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
});

export default function FarmRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  // const { loading } = useSelector((state: RootState) => state.farms);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmName: "",
      ownerName: "",
      latitude: "",
      longitude: "",
      birdCount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      // In a real application, this would be an API call
      // const response = await fetch('/api/farms', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });

      // Simulate API call
      dispatch(registerFarmRequest(values));

      toast({
        title: "Submitting...",
        description: `Registering ${values.farmName}`,
      });

      console.log("Form submitted:", values);

      toast({
        title: "Farm registered successfully!",
        description: `${values.farmName} has been registered.`,
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error registering farm",
        description:
          "There was an error registering your farm. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-t-4 border-t-green-600">
      <CardHeader className="bg-gradient-to-r from-green-50 to-transparent pb-8">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <Farm className="h-5 w-5" />
          <span className="text-sm font-medium">Farm Management</span>
        </div>
        <CardTitle className="text-2xl md:text-3xl">
          Farm Registration
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Register a new farm to start tracking daily reports and analytics.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-700 mb-2">
                <Farm className="h-4 w-4" />
                <h3 className="font-medium">Farm Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="farmName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter farm name"
                          {...field}
                          className="border-slate-300 focus-visible:ring-green-200"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder="Enter owner name"
                            {...field}
                            className="pl-10 border-slate-300 focus-visible:ring-green-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-700 mb-2">
                <MapPin className="h-4 w-4" />
                <h3 className="font-medium">Location</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 40.7128"
                          {...field}
                          type="number"
                          step="0.000001"
                          min="-90"
                          max="90"
                          className="border-slate-300 focus-visible:ring-green-200"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Value between -90 and 90
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. -74.0060"
                          {...field}
                          type="number"
                          step="0.000001"
                          min="-180"
                          max="180"
                          className="border-slate-300 focus-visible:ring-green-200"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Value between -180 and 180
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-700 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bird"
                >
                  <path d="M16 7h.01" />
                  <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
                  <path d="m20 7 2 .5-2 .5" />
                  <path d="M10 18v3" />
                  <path d="M14 17.75V21" />
                  <path d="M7 18a6 6 0 0 0 3.84-10.61" />
                </svg>
                <h3 className="font-medium">Flock Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="flockType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flock Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-slate-300 focus-visible:ring-green-200">
                            <SelectValue placeholder="Select flock type" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="z-50 bg-white shadow-md  rounded-md"
                          >
                            {/* Options */}
                            <SelectItem value="layers">Layers</SelectItem>
                            <SelectItem value="broilers">Broilers</SelectItem>
                            <SelectItem value="breeders">Breeders</SelectItem>
                            <SelectItem value="pullets">Pullets</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </motion.div>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birdCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Bird Count</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter number of birds"
                          {...field}
                          type="number"
                          min="1"
                          className="border-slate-300 focus-visible:ring-green-200"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal border-slate-300 focus-visible:ring-green-200 ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="w-auto p-0 z-50 bg-white border-none shadow-md rounded-md"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="rounded-md"
                          />
                        </motion.div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-6 flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto border-slate-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    Register Farm
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
