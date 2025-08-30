import GenericForm from "@/components/admin/SingerForm";

export default function EditSingerPage() {
  return (
    <GenericForm
      mode="edit"
      schemaKey="singer"
      baseUrl="/singers"
      redirectPath="/admin/dashboard/singer"
      itemName="Singer"
      idParamKey="singerId"
      nameParamKey="singerName"
    />
  );
}
