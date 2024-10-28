import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function TermsAndConditions({ isOpen,  onClose }) {
    return (
        <AlertDialog open={isOpen} onClose={onClose}>
            
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Terms and Conditions</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please read and accept the terms and conditions to proceed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                    <p>
                        By accepting, you agree to the terms and conditions of our service...
                    </p>
                </div>
                <AlertDialogFooter>
                    
                    <Button type="button" onClick={onClose}>
                        Cancel
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
