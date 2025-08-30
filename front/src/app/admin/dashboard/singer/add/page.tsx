import GenericForm from "@/components/admin/GenericForm";

export default function AddSingerPage() {
  return (
    <GenericForm
      mode="add"
      schemaKey="singer"
      baseUrl="/singers"
      redirectPath="/admin/dashboard/singer"
      itemName="Singer"
      idParamKey="singerId"
      nameParamKey="singerName"
    />
  );
}
