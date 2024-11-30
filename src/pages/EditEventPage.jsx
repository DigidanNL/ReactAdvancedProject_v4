import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

const EditEventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    console.log(`Fetching event with ID: ${eventId}`);
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);

        if (!response.ok) throw new Error("Fout bij het ophalen van evenement");
        const data = await response.json();
        console.log("Fetched event data:", data);
        setEvent(data);
      } catch (error) {
        console.error("Fout bij het ophalen van evenement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok)
          throw new Error("Fout bij het ophalen van categorieën");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Fout bij het ophalen van categorieën:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log(`Saving event with ID: ${eventId}`, event);
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error("Fout bij het bijwerken van evenement");

      toast({
        title: "Evenement bijgewerkt",
        description: "Het evenement is succesvol bijgewerkt.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/event/${eventId}`);
    } catch (error) {
      console.error("Fout bij het bijwerken van evenement:", error);
      toast({
        title: "Fout",
        description:
          "Er is een fout opgetreden bij het bijwerken van het evenement.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    navigate(`/event/${eventId}`);
  };

  if (loading) {
    return <p>Evenement wordt geladen...</p>;
  }

  if (!event) {
    return <p>Evenement niet gevonden...</p>;
  }

  return (
    <Box padding="4" maxWidth="600px" margin="0 auto">
      <Heading as="h1" size="lg" mb="4">
        Evenement Bewerken
      </Heading>

      <FormControl mb="4">
        <FormLabel>Titel</FormLabel>
        <Input name="title" value={event.title} onChange={handleChange} />
      </FormControl>

      <FormControl mb="4">
        <FormLabel>Beschrijving</FormLabel>
        <Input
          name="description"
          value={event.description}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb="4">
        <FormLabel>Afbeeldings-URL</FormLabel>
        <Input name="image" value={event.image} onChange={handleChange} />
      </FormControl>

      <FormControl mb="4">
        <FormLabel>Locatie</FormLabel>
        <Input name="location" value={event.location} onChange={handleChange} />
      </FormControl>

      <FormControl mb="4">
        <FormLabel>Starttijd</FormLabel>
        <Input
          name="startTime"
          type="datetime-local"
          value={
            event.startTime
              ? new Date(event.startTime).toISOString().slice(0, -1)
              : ""
          }
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb="4">
        <FormLabel>Eindtijd</FormLabel>
        <Input
          name="endTime"
          type="datetime-local"
          value={
            event.endTime
              ? new Date(event.endTime).toISOString().slice(0, -1)
              : ""
          }
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mb="4">
        <FormLabel>Categorie</FormLabel>
        <Select
          name="categories"
          value={event.categories?.[0] || ""}
          onChange={(e) =>
            setEvent((prevEvent) => ({
              ...prevEvent,
              categories: [parseInt(e.target.value)],
            }))
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button colorScheme="blue" onClick={handleSave} mt="4">
        Opslaan
      </Button>
      <Button colorScheme="gray" onClick={handleCancel} mt="4" ml="4">
        Annuleren
      </Button>
    </Box>
  );
};

export default EditEventPage;
