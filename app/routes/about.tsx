/* eslint-disable react/jsx-no-target-blank */
import { DefaultLayout } from "~/layouts/DefaultLayout";

export default function AboutPage() {
  //
  return (
    <DefaultLayout>
      <h1 style={{ marginTop: 40 }}>About MicroDiscount </h1>
      <p>Hello world 🌍,</p>
      <p>
        MicroDiscount is a free<b>centralized place to discover and share</b> quality discounts with the community.
      </p>
      <p>
        <a href="https://twitter.com/cliffordfajard0" target="_blank">
          Clifford
        </a>
        ,{" "}
        <a href="https://twitter.com/domnguyen5653" target="_blank">
          Dominic
        </a>{" "}
        and{" "}
        <a href="https://twitter.com/_robcerda" target="_blank">
          Rob{" "}
        </a>
        created this website because they noticed{" "}
        <b>there wasn't an easy, simple centralized place to discover discounts online.</b> Whether you're a student in
        college seeking a laptop or backpack discount, a teacher needing a software discount to teach her class or just
        a hobbyist trying out a new service out, our aim is to empower you.
      </p>
      <p>
        Most other discount websites are crowded with unhelpful ads and content distracting you from easily finding that
        discount you need. We are different. Our aim is to be simple and easy to use.
      </p>
      <h3>Would you like to submit a resource?</h3>
      <p>
        <b>We are open to contributions </b>. If you would like to submit a resource, consider clicking the "Add a
        Resource" button on this page. Alternatively you can checkout the source code of this website on our github page
        here (
        <a href="https://github.com/cliffordfajardo/educational-resources" target="_blank">
          Github Code{" "}
        </a>
        )
      </p>
    </DefaultLayout>
  );
}
