import Center from "@/components/layout/Center"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function ContactPage() {
  return (
    <>
    <img src='/hiking-header.jpg' alt='Mountain Cover'/>
    <Center>
    <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Top Questions</AccordionTrigger>
                <AccordionContent>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. 
                    Volutpat varius torquent vehicula quam a nulla rutrum. 
                    Quisque integer malesuada inceptos nam ultricies. 
                    Mollis justo luctus sit quis luctus. Dis curabitur tristique 
                    semper lacus eros commodo cursus. Congue dignissim vitae 
                    inceptos tempus, mus fringilla.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>How it works?</AccordionTrigger>
                <AccordionContent>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. 
                    Volutpat varius torquent vehicula quam a nulla rutrum. 
                    Quisque integer malesuada inceptos nam ultricies. 
                    Mollis justo luctus sit quis luctus. Dis curabitur tristique 
                    semper lacus eros commodo cursus. Congue dignissim vitae 
                    inceptos tempus, mus fringilla.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Contact Us</AccordionTrigger>
                <AccordionContent>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. 
                    Volutpat varius torquent vehicula quam a nulla rutrum. 
                    Quisque integer malesuada inceptos nam ultricies. 
                    Mollis justo luctus sit quis luctus. Dis curabitur tristique 
                    semper lacus eros commodo cursus. Congue dignissim vitae 
                    inceptos tempus, mus fringilla.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </Center>
        </>
  )
}
