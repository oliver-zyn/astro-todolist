import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, X, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterStatus = "all" | "completed" | "pending";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteTodoId, setDeleteTodoId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos);
        const todosWithDates = parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        setTodos(todosWithDates);
      } catch (error) {
        console.error("Erro ao carregar as tarefas:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    applyFilter(filterStatus);
  }, [todos, filterStatus]);

  const applyFilter = (status: FilterStatus) => {
    let filtered;
    switch (status) {
      case "completed":
        filtered = todos.filter((todo) => todo.completed);
        break;
      case "pending":
        filtered = todos.filter((todo) => !todo.completed);
        break;
      case "all":
      default:
        filtered = [...todos];
        break;
    }
    setFilteredTodos(filtered);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value as FilterStatus);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: crypto.randomUUID(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleTodoCompletion = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const openEditDialog = (todo: Todo) => {
    setEditTodo(todo);
    setIsDialogOpen(true);
  };

  const saveEditedTodo = () => {
    if (editTodo && editTodo.text.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text: editTodo.text } : todo
        )
      );
      setIsDialogOpen(false);
      setEditTodo(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeleteTodoId(id);
    setIsAlertDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTodoId) {
      setTodos(todos.filter((todo) => todo.id !== deleteTodoId));
      setIsAlertDialogOpen(false);
      setDeleteTodoId(null);
    }
  };

  return (
    <Card className="max-w-lg mx-auto shadow-lg">
      <CardHeader className="border-b">
        <CardTitle>Minha Lista de Tarefas</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Adicionar nova tarefa..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-1" /> Adicionar
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium mb-2">Filtrar por status:</div>
            <Select value={filterStatus} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Filtrar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="completed">Concluídas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between text-sm mt-2 bg-muted/30 p-2 rounded">
            <span>Total: {todos.length}</span>
            <span>Concluídas: {todos.filter((t) => t.completed).length}</span>
            <span>Pendentes: {todos.filter((t) => !t.completed).length}</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-muted-foreground p-4 bg-muted/20 rounded-md">
              {todos.length === 0
                ? "Nenhuma tarefa adicionada."
                : `Nenhuma tarefa ${
                    filterStatus === "completed" ? "concluída" : "pendente"
                  } encontrada.`}
            </p>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-3 border rounded-md ${
                  todo.completed ? "bg-muted/20" : "bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodoCompletion(todo.id)}
                    id={`todo-${todo.id}`}
                  />
                  <div>
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`font-medium ${
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {todo.text}
                    </label>
                    <div className="text-xs text-muted-foreground mt-1">
                      Criado em: {todo.createdAt.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={todo.completed ? "secondary" : "default"}>
                    {todo.completed ? "Concluído" : "Pendente"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(todo)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => openDeleteDialog(todo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
          </DialogHeader>
          <Input
            value={editTodo?.text || ""}
            onChange={(e) =>
              setEditTodo(
                editTodo ? { ...editTodo, text: e.target.value } : null
              )
            }
            className="mt-4"
          />
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="h-4 w-4 mr-1" /> Cancelar
            </Button>
            <Button onClick={saveEditedTodo}>
              <Check className="h-4 w-4 mr-1" /> Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
