import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CalendarIcon,
  ChevronRight,
  ClipboardList,
  Egg,
  Loader2,
  Wheat,
  Bird,
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
import type { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { submitDailyReportRequest } from "@/slices/dailyReportSlice";

const formSchema = z.object({
  farmId: z.string({
    required_error: "Please select a farm.",
  }),
  date: z.date({
    required_error: "Report date is required.",
  }),
  eggsCollected: z.string().refine(
    (val) => {
      const num = Number.parseInt(val);
      return !isNaN(num) && num >= 0;
    },
    { message: "Eggs collected must be a non-negative number." }
  ),
  feedUsed: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num >= 0;
    },
    { message: "Feed used must be a non-negative number." }
  ),
  mortality: z.string().refine(
    (val) => {
      const num = Number.parseInt(val);
      return !isNaN(num) && num >= 0;
    },
    { message: "Mortality must be a non-negative number." }
  ),
});

export default function DailyFarmReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setSelectedFarmName] = useState<string>("");

  const farms = useSelector((state: RootState) => state.farms.farms);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eggsCollected: "",
      feedUsed: "",
      mortality: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      dispatch(submitDailyReportRequest(values));

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Daily report submitted:", values);

      const farmName =
        farms.find((farm) => farm.id === values.farmId)?.farmName ||
        "Unknown farm";

      toast({
        title: "Daily report submitted successfully!",
        description: `Report for ${farmName} on ${format(
          values.date,
          "PPP"
        )} has been recorded.`,
      });

      form.reset({
        farmId: values.farmId,
        date: new Date(),
        eggsCollected: "",
        feedUsed: "",
        mortality: "",
      });
    } catch (error) {
      toast({
        title: "Error submitting report",
        description:
          "There was an error submitting your daily report. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-t-4 border-t-green-600">
      <CardHeader className="bg-gradient-to-r from-green-50 to-transparent pb-8">
        <div className="flex items-center gap-2 text-green-600 mb-2">
          <ClipboardList className="h-5 w-5" />
          <span className="text-sm font-medium">Daily Reporting</span>
        </div>
        <CardTitle className="text-2xl md:text-3xl">
          Daily Farm Report
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Record daily production metrics and statistics for your farm.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  className="lucide lucide-tractor"
                >
                  <path d="M3 4h9l1 7" />
                  <path d="M4 11V4" />
                  <path d="M8 10V4" />
                  <path d="M18 5c1.5 0 3 1.5 3 3v3c0 1.5-1.5 3-3 3h-3v-3h3V8h-3V5z" />
                  <circle cx="7" cy="15" r="2" />
                  <circle cx="15" cy="15" r="2" />
                  <path d="M9 17h6" />
                </svg>
                <h3 className="font-medium">Farm Selection</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="farmId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          const farm = farms.find((f) => f.id === value);
                          setSelectedFarmName(farm?.farmName || "");
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-slate-300 w-full focus-visible:ring-green-200">
                            <SelectValue placeholder="Select a farm" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-50 bg-white shadow-md rounded-md transition-all duration-200">
                          {farms.map((farm) => (
                            <SelectItem key={farm.id} value={farm.id}>
                              {farm.farmName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Report Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
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
                        </PopoverTrigger>

                        <PopoverContent
                          align="start"
                          className="w-auto p-0 z-50 bg-white border-none shadow-md rounded-md transition-all duration-200"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            initialFocus
                            className="rounded-md"
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-700 mb-2">
                <ClipboardList className="h-4 w-4" />
                <h3 className="font-medium">Production Metrics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="eggsCollected"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Eggs Collected</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Egg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            placeholder="Number of eggs"
                            type="number"
                            min="0"
                            className="pl-10 border-slate-300 focus-visible:ring-green-200"
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Total count for the day
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feedUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feed Used (kg)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Wheat className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            placeholder="Amount in kg"
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-10 border-slate-300 focus-visible:ring-green-200"
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Total feed used in kilograms
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mortality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mortality</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Bird className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder="Number of birds"
                            {...field}
                            type="number"
                            min="0"
                            className="pl-10 border-slate-300 focus-visible:ring-green-200"
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Number of birds lost
                      </FormDescription>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
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
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Report
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
