import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PhoneInput } from "../menu/PhoneInput";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import TermsAndConditions from "../menu/TermsAndConditions";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
const formSchema = z.object({
  joinerName: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Email is required." }),
  contactNumber: z.string().min(13, { message: "Contact number is invalid." }),
  pickupLocation: z.string().min(2, { message: "Pickup location is required." }),
  age: z.string().min(1, { message: "Age is required." }),
  sex: z.string().min(1, { message: "Sex is required." }),
  homeAddress: z.string().min(2, { message: "Home address is required." }),
  emergencyContactPerson: z.string().min(2, { message: "Emergency contact person is required." }),
  emergencyContactNumber: z.string().min(13, { message: "Emergency contact number is required." }),
  medicalCondition: z.string(),
  conditionDetails: z.string().optional(),
  proofOfPayment: z
  .any()
  .refine((value) => !!value, 'Proof of payment is required.'),
  termsAccepted: z.boolean().refine(value => value === true, {
    message: "You must accept the terms and conditions.",
  }),
});

export function JoinerDetailsForm({trailId,packageId}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      joinerName: "",
      email: "",
      contactNumber: "",
      pickupLocation: "",
      age: "",
      sex: "",
      homeAddress: "",
      emergencyContactPerson: "",
      emergencyContactNumber: "",
      medicalCondition: "",
      conditionDetails: "",
      proofOfPayment:"",
      termsAccepted: false,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMedicalConditionYes, setIsMedicalConditionYes] = useState(false);
  const [proofOfPaymentUrl, setProofOfPaymentUrl] = useState('');
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  // Watch medicalCondition field
  useEffect(() => {
    const medicalConditionValue = form.watch('medicalCondition');
    setIsMedicalConditionYes(medicalConditionValue === 'Yes');
  }, [form.watch('medicalCondition')]);

  async function handleFileChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const file = files[0];
      form.setValue('proofOfPayment', file); // Set file in form state
      const data = new FormData();
      data.set('file', file);

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
      .then(response => {
        if (response.ok) {
          return response.json().then(link => {
            setProofOfPaymentUrl(link); // Set URL for displaying image
          });
        } 
        throw new Error('Something went wrong'); 
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload complete',
        error: 'Upload failed',
      });
    }
  }

  // Refactored submit logic
  const onSubmit = async (values) => {
    try {
      const submissionData = {
        ...values,
        proofOfPayment: proofOfPaymentUrl, // Use the uploaded file URL
        packageId,
        trailId,
      };

      await toast.promise(
        fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData),
        }),
        {
          loading: 'Submitting...',
          success: 'Submission successful!',
          error: 'Submission failed.',
        }
      );

      // Clear form after submission
      form.reset();
      setProofOfPaymentUrl('');
      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
        {/* Joiner's Name */}
        <FormField
          control={form.control}
          name="joinerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hiker name(s)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your name(s)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Sex Dropdown */}
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="border border-gray-300 rounded-md px-4 py-2">
                    {field.value || "--Select here--"}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => field.onChange("Male")}>Male</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => field.onChange("Female")}>Female</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => field.onChange("Prefer not to say")}>
                    Prefer not to say
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Number */}
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact No.</FormLabel>
              <FormControl>
                <PhoneInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Age */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter age" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Pick-up Location */}
        <FormField
          control={form.control}
          name="pickupLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pick-up Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter pick-up location" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Home Address */}
        <FormField
          control={form.control}
          name="homeAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Address</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter home address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Emergency Contact Person */}
        <FormField
          control={form.control}
          name="emergencyContactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact Person</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter emergency contact person" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Emergency Contact Number */}
        <FormField
          control={form.control}
          name="emergencyContactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact Number</FormLabel>
              <FormControl>
                <PhoneInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Medical Condition */}
        <FormField
          control={form.control}
          name="medicalCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Have Medical Condition?</FormLabel>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="border border-gray-300 rounded-md px-4 py-2">
                    {field.value || "--Select here--"}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => field.onChange("")}>--Select here--</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => field.onChange("Yes")}>Yes</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => field.onChange("No")}>No</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Condition Details */}
        {isMedicalConditionYes && (
          <FormField
            control={form.control}
            name="conditionDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition Details</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Describe your medical condition" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {/* Proof of Payment */}
        <FormField
          control={form.control}
          name="proofOfPayment"
          render={() => (
            <FormItem>
              <FormLabel>Proof of Payment</FormLabel>
              <Input type="file" onChange={handleFileChange} accept="image/*" />
              <FormMessage />
              {proofOfPaymentUrl && <img src={proofOfPaymentUrl} alt="Proof of Payment" className="mt-2 w-32" />}
            </FormItem>
          )}
        />
        
        {/* Terms and Conditions */}
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Label>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    field.onChange(isChecked);

                    // Open modal if unchecked
                    if (!isChecked) {
                      handleOpen();
                    }
                  }}
                />
                <span 
                  onClick={() => handleOpen()} // Open modal on click
                  className="mx-2 cursor-pointer text-blue-400 hover:underline"
                >
                  Read Terms and Conditions
                </span>
                </Label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Modal for Terms and Conditions */}
        <TermsAndConditions isOpen={isModalOpen} onClose={handleClose} />
        {/* Submit Button */}
        <button type="submit" className="col-span-3 mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </form>
    </Form>
  );
}