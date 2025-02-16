"use client";
import Sidebar from "../components/sidebar/Sidebar";

export default function About() {
  return (
    <main className={`flex flex-col mt-[10rem] justify-start`}>
      <Sidebar />
      <div className={`flex flex-col items-center no-highlight`}>
        <p className="py-4 w-[80vw] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          tempus dapibus justo, a varius neque. Proin dui metus, aliquet non
          tortor eu, placerat porttitor mauris. Nullam accumsan in quam sit amet
          facilisis. Donec eu mi auctor, tempus mauris ut, fringilla nulla.
          Vestibulum vel lorem venenatis nulla posuere interdum nec nec turpis.
          Nunc scelerisque dapibus commodo. Aenean sollicitudin pulvinar ligula
          sed accumsan. Maecenas sem lorem, pharetra quis quam eu, viverra
          gravida diam. Duis pulvinar erat non tellus mattis, ut maximus sem
          posuere. Vivamus nibh nulla, sagittis id dictum ut, sagittis eget
          augue. In egestas magna arcu, vitae ultricies dolor vestibulum a. Nunc
          interdum est in erat volutpat dignissim. Integer ultrices pellentesque
          diam lobortis elementum. Donec eros enim, cursus pulvinar fringilla
          sit amet, ornare ut turpis. Vestibulum venenatis purus in magna
          molestie, id tincidunt mi ultrices. Nunc accumsan, massa at finibus
          auctor, erat nulla aliquet velit, eget eleifend justo tortor ut lacus.
          Ut semper diam eu elit blandit, in malesuada diam tempus. Maecenas
          euismod eleifend magna eget ullamcorper. Vivamus consectetur, quam
          vitae placerat pulvinar, sem felis fringilla nisl, non iaculis massa
          lectus eu ex. Nunc laoreet diam sit amet tempor finibus. Maecenas
          tortor nisl, pretium ut scelerisque non, elementum a dui. Praesent
          consectetur nec tortor a egestas. Proin malesuada dolor ante, vel
          aliquet justo vulputate vitae.
        </p>
      </div>
    </main>
  );
}
