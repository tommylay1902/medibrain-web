import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadFile from "../components/upload-file"
import UploadNote from "../components/upload-note"

const UploadSection = () => {
  return (
    <Tabs defaultValue="file" className="w-full flex justify-center items-center">
      <TabsList>
        <TabsTrigger value="file" className="cursor-pointer">Upload File</TabsTrigger>
        <TabsTrigger value="note" className="cursor-pointer">Upload Note</TabsTrigger>
      </TabsList>
      <TabsContent value="file"><UploadFile /></TabsContent>
      <TabsContent value="note" className="w-full"><UploadNote /></TabsContent>
    </Tabs>
  )
}

export default UploadSection
