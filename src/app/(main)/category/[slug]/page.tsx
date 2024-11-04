export default async function Category({ params }: { params: { slug: string } }) {
    return (
        <div>
            Category is {params.slug}
        </div>
    );
};
