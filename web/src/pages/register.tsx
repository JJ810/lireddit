import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InpuField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          console.log(111111111);
          if (response.data?.register.errors) {
            console.log(22222222);
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            console.log(333333333);
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InpuField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InpuField name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={4}>
              <InpuField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              variantColor="teal"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
