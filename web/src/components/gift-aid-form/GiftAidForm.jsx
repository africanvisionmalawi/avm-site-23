import styled from "@emotion/styled";
import React from "react";

const FormCont = styled.div`
  margin: 0 auto 3rem;
  max-width: 500px;
  width: 100%;
`;

const FormExtra = styled.div`
  display: none;
`;

const TextInput = styled.input`
  border: 1px solid #d7dade;
  display: inline-block;
  font-size: 1rem;
  padding: 0 8px;
  width: 100%;
  @media (min-width: 768px) {
    width: 70%;
  }
`;

const Button = styled.button`
  background: #6cbede;
  border: 1px solid #6cbede;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.9em;
  font-weight: bold;
  margin-top: 12px;
  padding: 6px 20px;
  text-align: center;
  :hover {
    background: #58b5d7;
    color: #fff;
  }
  @media (min-width: 600px) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-top: 0;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;

const Label = styled.label`
  padding-right: 0.5rem;
  width: 100%;
  @media (min-width: 768px) {
    text-align: right;
    width: 30%;
  }
`;

const Text = styled.p`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const GiftAidForm = (props) => {
  const [state, setState] = React.useState({});

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <FormCont>
      <h3>Giftaid it</h3>

      <form
        action="/giftaidformsuccess/"
        name="gift-aid-form"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <Row>
          <Label>Date</Label>
          <TextInput
            type="date"
            name="cm-date"
            id="date"
            placeholder="Date"
            required
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Label>Your Name</Label>
          <TextInput
            type="text"
            name="name"
            id="fieldName"
            placeholder="Your Name"
            required
            onChange={handleChange}
          />
        </Row>

        <Row>
          <Label>Address</Label>
          <TextInput
            type="text"
            name="address"
            id="fieldAddress"
            placeholder="Address"
            required
            onChange={handleChange}
          />
        </Row>

        <Row>
          <Label>Town</Label>
          <TextInput
            type="text"
            name="town"
            id="fieldTown"
            placeholder="Town"
            onChange={handleChange}
          />
        </Row>

        <Row>
          <Label>County</Label>
          <TextInput
            type="text"
            name="county"
            id="fieldCounty"
            placeholder="County"
            onChange={handleChange}
          />
        </Row>

        <Row>
          <Label>Postcode</Label>
          <TextInput
            type="postcode"
            name="postcode"
            id="fieldCode"
            placeholder="Postcode"
            required
            onChange={handleChange}
          />
        </Row>

        <Row>
          <Label>Phone</Label>
          <TextInput
            type="tel"
            name="phone"
            id="fieldTel"
            placeholder="Phone"
            onChange={handleChange}
          />
        </Row>

        <Row>
          <Label>Email Address</Label>
          <TextInput
            type="email"
            name="email"
            id="fieldEmail"
            placeholder="Email"
            required
            onChange={handleChange}
          />
        </Row>

        <Text>
          By completing the above I confirm that I would like African Vision
          Malawi , registered charity 1113786, to treat all donations I have
          made in the last 4 years and all future donations, as Gift Aid until I
          notify you otherwise. The amount of tax reclaimed on your donation at
          the basic rate of tax must not exceed the amount of income and/or
          capital gains tax you pay in any tax year. Please inform us if your
          donations cease to qualify
        </Text>
        <Button className="btn btn-primary" type="submit">
          Submit
        </Button>

        <FormExtra>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={handleChange} />
          </label>
        </FormExtra>
        <input type="hidden" name="form-name" value="gift-aid-form" />
      </form>
    </FormCont>
  );
};
